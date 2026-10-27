import http.server
import socketserver
import webbrowser
import os

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"=====================================================")
        print(f" KeepIn Cool (킵인쿨) MVP 플랫폼 로컬 서버 구동 완료!")
        print(f" 접속 주소: {url}")
        print(f" 브라우저에서 사이트를 자동으로 엽니다...")
        print(f" 종료하려면 Ctrl+C 를 누르세요.")
        print(f"=====================================================")
        webbrowser.open(url)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n서버가 안전하게 종료되었습니다.")
