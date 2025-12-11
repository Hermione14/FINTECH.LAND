const BLOG_DATA = [
  {
    id: 1,
    category: "INGENIERÍA DE SOFTWARE",
    title: "Desacoplando el Monolito: Estrategias de Migración Bancaria",
    excerpt:
      "Cómo aplicamos el patrón 'Strangler Fig' para modernizar un Core Bancario de 20 años sin detener la operación transaccional ni un segundo.",
    date: "12 OCT 2023",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
    author: {
      name: "Fredy Valle",
      role: "CTO & Co-Founder",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      linkedin: "https://linkedin.com",
    },
    content: `
                    <h3>El Problema del Legacy</h3>
                    <p>La mayoría de las instituciones financieras operan sobre mainframes o sistemas monolíticos desarrollados en COBOL o Java temprano en los años 2000. Estos sistemas son robustos, sí, pero increíblemente rígidos. Cualquier cambio menor implica semanas de pruebas de regresión.</p>
                    <p>En Fintech.land, nos enfrentamos a un reto común: ¿Cómo modernizar sin reescribir todo desde cero (Big Bang) y arriesgar la operación?</p>
                    
                    <h3>El Patrón Strangler Fig</h3>
                    <p>Inspirado en la naturaleza, este patrón consiste en crear una nueva aplicación alrededor de la antigua, reemplazando funcionalidades poco a poco hasta que el sistema antiguo "muere".</p>
                    <ul>
                        <li><strong>Fase 1: Intercepción.</strong> Colocamos un API Gateway frente al monolito. Todas las peticiones pasan por ahí.</li>
                        <li><strong>Fase 2: Microservicio Nuevo.</strong> Desarrollamos una funcionalidad específica (ej. Consulta de Saldo) en una arquitectura moderna (Node.js/Go).</li>
                        <li><strong>Fase 3: Enrutamiento.</strong> El API Gateway desvía el tráfico de esa funcionalidad al nuevo microservicio, dejando el resto al monolito.</li>
                    </ul>
                    <h3>Resultados</h3>
                    <p>Logramos reducir el tiempo de despliegue de funcionalidades nuevas de 3 meses a 2 semanas, manteniendo una disponibilidad del 99.99% durante la migración.</p>
                `,
  },
  {
    id: 2,
    category: "CUMPLIMIENTO & REGULACIÓN",
    title: "Open Banking en México: La API Estandarizada CNBV",
    excerpt:
      "Análisis técnico de los requerimientos de seguridad para las APIs de Finanzas Abiertas. OAuth 2.0, mTLS y gestión de consentimiento.",
    date: "28 SEP 2023",
    readTime: "12 min",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    author: {
      name: "Alejandro Maldonado",
      role: "CEO & Fintech Advisor",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      linkedin: "https://linkedin.com",
    },
    content: `
                    <h3>El Estándar CNBV</h3>
                    <p>La circular de la Comisión Nacional Bancaria y de Valores establece reglas claras para el intercambio de datos transaccionales y agregados. No es solo exponer un JSON; es garantizar que quien consume la data es quien dice ser.</p>
                    
                    <h3>Seguridad: mTLS y OAuth 2.0</h3>
                    <p>La autenticación mutua (mTLS) es obligatoria. No basta con que el cliente confíe en el servidor; el servidor debe validar criptográficamente el certificado del cliente antes de siquiera procesar el handshake TLS.</p>
                    <p>Sobre esta capa de transporte seguro, implementamos flujos de OAuth 2.0 (Financial-grade API - FAPI) para gestionar los tokens de acceso y los consentimientos granulares del usuario final.</p>
                `,
  },
  {
    id: 3,
    category: "INTELIGENCIA ARTIFICIAL",
    title: "LLMs en Atención al Cliente: Más allá del Chatbot",
    excerpt:
      "Implementando modelos de lenguaje locales para análisis de sentimiento en tiempo real y detección de fraude en llamadas de soporte.",
    date: "15 SEP 2023",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
    author: {
      name: "José C. Ibarra",
      role: "Chief Data Officer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      linkedin: "https://linkedin.com",
    },
    content: `
                    <h3>Latencia vs Privacidad</h3>
                    <p>Usar GPT-4 es fácil, pero enviar datos financieros sensibles a servidores externos es un riesgo de cumplimiento. Nuestra solución: modelos Open Source (Llama 2 / Mistral) fine-tuneados y desplegados on-premise.</p>
                    <h3>Análisis de Sentimiento en Tiempo Real</h3>
                    <p>El sistema transcribe la llamada en vivo y analiza el tono del cliente. Si detecta frustración extrema o palabras clave de "fraude" o "robo", escala el ticket automáticamente a un supervisor humano antes de que la llamada termine.</p>
                `,
  },
];
