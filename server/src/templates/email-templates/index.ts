import { readFileSync } from "fs";
import { replace } from "../../helper";
export const emailTemplates = {
  verifyAccount: (targetUrl: URL | string) =>
    readFileSync("src/templates/email-templates/verify-account.html")
      .toString()
      .replace(/{{targetUrl}}/g, targetUrl.toString()),
  resetPassword: (targetUrl: URL | string) =>
    readFileSync("src/templates/email-templates/reset-password.html")
      .toString()
      .replace(/{{targetUrl}}/g, targetUrl.toString()),
  joinOrg: (targetUrl: URL | string, orgName: string) =>
    replace(
      readFileSync("src/templates/email-templates/join-org.html").toString(),
      { "{{targetUrl}}": targetUrl.toString(), "{{orgName}}": orgName }
    ),
};
