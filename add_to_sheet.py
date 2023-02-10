import requests
from secret import SPREADSHEET_ID, key_file_location
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import gspread
from gspread_formatting import *

def add_row(values):
    # Authenticate to the Google Sheets API
    gc = gspread.service_account(key_file_location)

    # Open the Google Sheet
    sheet = gc.open_by_key(SPREADSHEET_ID)

    # Get the first worksheet
    worksheet = sheet.get_worksheet(0)

    # Append the new data
    worksheet.append_row(values)

    # Get the last row number
    last_row = worksheet.row_count

    # Create the cell format
    cell_format = CellFormat(
        backgroundColor = color(1, 1, 1),
        # horizontalAlignment='CENTER'
    )

    # Format the newly added row with a white background color and centered text
    format_cell_range(worksheet, 'A{}:Z{}'.format(last_row, last_row), cell_format)

    print("Row added successfully.")
    return True