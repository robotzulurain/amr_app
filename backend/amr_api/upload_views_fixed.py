# Safe CSV processing with null handling
def safe_csv_processing(csv_data):
    """Process CSV data with safe null handling"""
    processed_rows = []
    errors = []
    
    for i, row in enumerate(csv_data, start=1):
        try:
            safe_row = {}
            for key, value in row.items():
                # Safely handle None values before strip()
                if value is None:
                    safe_row[key] = ''
                else:
                    safe_row[key] = str(value).strip()
            processed_rows.append(safe_row)
        except Exception as e:
            errors.append(f"row {i}: {str(e)}")
    
    return processed_rows, errors
