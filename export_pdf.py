import subprocess
import sys
import os

def check_and_install(package, import_name=None):
    import_name = import_name or package
    try:
        __import__(import_name)
        return True
    except ImportError:
        print(f"Cài đặt {package}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package, "-q"])
        return True

check_and_install("weasyprint")

from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

html_path = os.path.join(os.path.dirname(__file__), "quantum_report.html")
pdf_path  = os.path.join(os.path.dirname(__file__), "quantum_report.pdf")

font_config = FontConfiguration()

print("Đang xuất PDF...")
HTML(filename=html_path).write_pdf(
    pdf_path,
    font_config=font_config,
    presentational_hints=True,
)
print(f"Xuất thành công: {pdf_path}")
