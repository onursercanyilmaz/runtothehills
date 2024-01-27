export default function urlChecker(link: string) {
    // Define a regular expression pattern for URL validation with optional http/https
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$|^www\.[^\s/$.?#].[^\s]*$/i;

    // Test the input string against the pattern
    return urlPattern.test(link);
}