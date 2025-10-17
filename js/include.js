document.addEventListener('DOMContentLoaded', async () => {
  const markers = document.querySelectorAll('[data-include]');
  const existingSrc = new Set(
    [...document.querySelectorAll('script[src]')].map(s => new URL(s.src, location.href).href)
  );
  for (const el of markers) {
    const url = el.getAttribute('data-include'); // ej.: "FooterHeader/Footer.html"
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const html = await res.text();

      const tmp = document.createElement('div');
      tmp.innerHTML = html;

      // Ejecutar <script> del fragmento y evitar duplicados
      tmp.querySelectorAll('script').forEach(old => {
        const s = document.createElement('script');
        if (old.src) {
          const abs = new URL(old.getAttribute('src'), location.href).href;
          if (existingSrc.has(abs)) { old.remove(); return; }
          s.src = old.getAttribute('src');
          existingSrc.add(abs);
        } else {
          s.text = old.textContent;
        }
        if (old.type) s.type = old.type;
        document.body.appendChild(s);
        old.remove();
      });

      el.outerHTML = tmp.innerHTML; // reemplaza el marcador
    } catch (e) {
      console.error('Include failed:', url, e);
      el.outerHTML = `<!-- include failed: ${url} -->`;
    }
  }
});
