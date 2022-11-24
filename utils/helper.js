import { express } from "express";
import fs from "fs";
import axios from "axios";

export const sendMessage = async () => {
  try {
    const formData = new URLSearchParams();
    formData.append("to", "8667726969");
    formData.append("from", "smsinfo");
    formData.append("content", "Hey Customer , Your OTP code is {code}");
    formData.append("expiry", "900");

    const response = await axios({
      method: "POST",
      url: "https://rest-api.d7networks.com/secure/send",
      headers: {
        Authorization: "Basic ZWZlZjY5NTk6b3FYRUtDRDg=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    });
    console.log("data=>", response?.data);
  } catch (err) {
    console.log(err.message);
  }
};

sendMessage();
