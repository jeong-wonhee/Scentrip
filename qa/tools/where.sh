#!/bin/zsh
# 원본에서 문구 위치 찾기: qa/tools/where.sh "문구" [파일패턴]
cd "$(dirname $0)/../.." && grep -rnF -- "$1" screens/${2:-*.html} reference/*.js 2>/dev/null | cut -c1-220 | head -8
