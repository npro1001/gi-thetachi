from datetime import datetime
from pytz import timezone

def convert(date_obj):
    # date_obj = datetime.strptime(date_str, '%Y-%m-%dT%H:%M:%S.%f+00:00')

    # Convert timezone to EST
    est = timezone('US/Eastern')
    date_est = date_obj.astimezone(est)

    # Format the date in the required format
    date_formatted = date_est.strftime('%m/%d/%Y %H:%M EST')

    return date_formatted