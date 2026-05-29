# Diagrama — request/response local

```text
Leitor
  |
  | abre http://localhost:8000/sobre.html
  v
Navegador
  |
  | GET /sobre.html
  | GET /styles.css
  | GET /app.js
  | GET /data/equipe.json
  v
Servidor estático local (python3 -m http.server)
  |
  | devolve arquivos estáticos
  v
Navegador renderiza HTML + CSS e monta cards com JavaScript
```

Observação: não há API real. `data/equipe.json` é um arquivo estático mockado.

