import pandas as pd
from openpyxl import Workbook
from openpyxl.utils.dataframe import dataframe_to_rows
from django.http import HttpResponse
from django.views.decorators.http import require_POST
import json
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token

@require_POST
def csv(request):
    data = json.loads(request.body)

    df = pd.DataFrame(data) 

    # Create a response with the CSV file
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="Applications.csv"'
    df.to_csv(path_or_buf=response, index=False)

    return response

@require_POST
def excel(request):
    data = json.loads(request.body)
    # Convert the data to a pandas DataFrame
    df = pd.DataFrame(data)  # Pass the list of dictionaries directly

    # Create a new workbook and select the active worksheet
    book = Workbook()
    sheet = book.active

    # Write the DataFrame to the worksheet
    for r in dataframe_to_rows(df, index=False, header=True):
        sheet.append(r)

    # Adjust the column widths
    for column in sheet.columns:
        max_length = 0
        column = [cell for cell in column]
        for cell in column:
            try:
                if len(str(cell.value)) > max_length:
                    max_length = len(cell.value)
            except:
                pass
        adjusted_width = (max_length + 2)
        sheet.column_dimensions[column[0].column_letter].width = adjusted_width

    # Create a response with the Excel file
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="Applications.xlsx"'
    book.save(response)

    return response

