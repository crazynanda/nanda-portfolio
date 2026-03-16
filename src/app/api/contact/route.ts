import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const formDataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });

    const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbySCNR5XjwLX2lds6t7tT6ahLe1wzqnl7JG7Cdot0DLyp2eUzGdST2APDkpBrmUcrto3w/exec";

    const googleFormData = new URLSearchParams();
    Object.entries(formDataObj).forEach(([key, value]) => {
      googleFormData.append(key, value);
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      body: googleFormData,
      redirect: "follow",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok && response.status !== 302) {
      return NextResponse.json(
        { success: false, error: "Failed to submit" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
