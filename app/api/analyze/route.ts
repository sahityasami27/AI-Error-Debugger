import { NextRequest, NextResponse } from "next/server";

import { model } from "@/lib/gemini";
import { SYSTEM_PROMPT } from "@/lib/Systemprompt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { error } = body;

    if (!error) {
      return NextResponse.json(
        {
          message: "Error log is required",
        },
        { status: 400 }
      );
    }

    const prompt = `
${SYSTEM_PROMPT}

ERROR LOG:
${error}
`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    console.log("RAW GEMINI RESPONSE:");
    console.log(responseText);

    // Remove markdown code fences
    responseText = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    // Sanitize newlines/tabs inside quoted strings before parsing
    const sanitized = responseText
      .replace(/:\s*"([^"]*)"/g, (match) => {
        return match.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
      });

    let parsedResponse;

    try {
      parsedResponse = JSON.parse(sanitized);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Response:", responseText.substring(0, 500));

      // Fallback
      parsedResponse = {
        category: "Unknown",
        rootCause: "- Unable to parse API response",
        explanation: "- JSON parsing failed",
        fixSuggestion: "- Check API logs\n- Verify response format\n- Retry the request",
        prevention: "- Implement response validation\n- Add sanitization\n- Monitor API health",
        severity: "Medium",
      };
    }

    // Ensure all fields are strings
    const safeResponse = {
      category: String(parsedResponse.category || "Unknown"),
      rootCause: String(parsedResponse.rootCause || "No root cause provided."),
      explanation: String(parsedResponse.explanation || "No explanation provided."),
      fixSuggestion: String(parsedResponse.fixSuggestion || "No fix suggestions provided."),
      prevention: String(parsedResponse.prevention || "No prevention steps provided."),
      severity: String(parsedResponse.severity || "Medium"),
    };

    return NextResponse.json(safeResponse);

  } catch (error) {
    console.error("Gemini API Error:", error);

    return NextResponse.json(
      {
        category: "API Failure",
        rootCause: "- The backend failed while analyzing the error log",
        explanation: "- An exception occurred while communicating with the Gemini API",
        fixSuggestion: "- Verify API key\n- Check Gemini quota\n- Validate model configuration",
        prevention: "- Add API monitoring\n- Implement retry logic\n- Add backend validation",
        severity: "High",
      },
      { status: 500 }
    );
  }
}