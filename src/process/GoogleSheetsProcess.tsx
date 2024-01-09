// createSheet.js
import { Auth, google } from 'googleapis';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

interface Credentials {
    access_token: string;
}

const authenticateGoogleSheetsAPI = async (token: string) => {
    const credentials: Credentials = {
        access_token: token,
    };

    const auth = new google.auth.GoogleAuth();
    await auth.fromJSON(credentials as Auth.CredentialBody);

    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
};

// ... (other imports and code)

const getSheetId = async (sheets: any, title: any) => {
    try {
        // List all spreadsheets
        const spreadsheetsList = await sheets.spreadsheets.list();

        // Find the sheet by title in each spreadsheet
        for (const spreadsheet of spreadsheetsList.data.spreadsheets || []) {
            const spreadsheetId = spreadsheet.spreadsheetId;
            const response = await sheets.spreadsheets.get({
                spreadsheetId: spreadsheetId,
            });

            const sheet = response.data.sheets.find((sheet: any) => sheet.properties.title === title);

            if (sheet) {
                return { spreadsheetId, sheetId: sheet.properties.sheetId };
            }
        }

        return null; // Sheet not found
    } catch (error: any) {
        console.error('Error:', error.message);
        return null; // Return null on error
    }
};

const createSheet = async (token: any) => {
    const sheets: any = await authenticateGoogleSheetsAPI(token);

    const sheetTitle = 'runtothehillsdata';
    const sheetInfo = await getSheetId(sheets, sheetTitle);

    if (!sheetInfo) {
        // Sheet not found in any spreadsheet, create a new one

        // Specify the headers
        const headers = ['pathid', 'pathname', 'platformname', 'itemname', 'itemlink', 'progress'];

        // Create the sheet with headers
        await sheets.spreadsheets.create({
            resource: {
                properties: {
                    title: sheetTitle,
                },
                sheets: [
                    {
                        properties: {
                            title: 'Sheet1', // Specify sheet name
                        },
                        data: [
                            {
                                startRow: 0,
                                startColumn: 0,
                                rowData: {
                                    values: headers.map((header) => ({ userEnteredValue: { stringValue: header } })),
                                },
                            },
                        ],
                    },
                ],
            },
        });
    } else {
        // Sheet found, you can access its info using sheetInfo.spreadsheetId and sheetInfo.sheetId
        console.log('Sheet found:', sheetInfo);
    }
};

export default createSheet;
