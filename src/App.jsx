import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, BarChart3, Bot, BrainCircuit, Check, ChevronRight,
  Clock3, Mail, Menu, MessageCircle, Phone, Send, ShieldCheck,
  Sparkles, Users, X, Zap, Play, Plus, Quote, Building2
} from 'lucide-react'
import logoUrl from '../images/logo2.png'

const PHONE = '5519991197862'
const whatsApp = (text) => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`

const features = [
  { icon: Clock3, title: 'Sempre disponível', text: 'Atenda seus clientes 24 horas por dia, inclusive fora do horário comercial.' },
  { icon: BrainCircuit, title: 'IA que entende', text: 'Respostas naturais, treinadas com as informações e o tom da sua empresa.' },
  { icon: Zap, title: 'Resposta instantânea', text: 'Elimine filas e responda cada nova oportunidade em poucos segundos.' },
  { icon: BarChart3, title: 'Foco em conversão', text: 'Qualifique contatos, recupere interessados e aproxime cada conversa da venda.' },
]

const plans = [
  { name: 'Starter', desc: 'Para começar a automatizar', price: '599', items: ['1 conexão WhatsApp', 'Fluxos ilimitados', 'IA avançada'] },
  { name: 'Profissional', desc: 'Para operações em crescimento', price: '1.299', featured: true, items: ['3 conexões WhatsApp', 'IA avançada', 'Dashboard de resultados'] },
  { name: 'Business', desc: 'Para equipes e agências', price: '1.799', items: ['10 conexões WhatsApp', 'Suporte prioritário', 'API de integração'] },
  { name: 'Enterprise', desc: 'Uma solução sob medida', price: null, items: ['Conexões ilimitadas', 'Marca personalizada', 'Gerente de contas'] },
]

const faqPlaceholders = [
  { question: 'Pergunta frequente 01', answer: 'Espaço preparado para a equipe SYNAPTI cadastrar uma resposta oficial.' },
  { question: 'Pergunta frequente 02', answer: 'Espaço preparado para a equipe SYNAPTI cadastrar uma resposta oficial.' },
  { question: 'Pergunta frequente 03', answer: 'Espaço preparado para a equipe SYNAPTI cadastrar uma resposta oficial.' },
]

const testimonialExamples = [
  {
    quote: 'Antes, muitos clientes desistiam porque demorávamos para responder. Com a Synapti, o atendimento começa na hora e nossa equipe recebe o contato muito mais preparado para fechar.',
    name: 'Mariana Costa',
    role: 'Gestora de clínica',
  },
  {
    quote: 'A automação assumiu as perguntas repetitivas e deixou nosso time livre para cuidar das negociações. Hoje conseguimos atender mais pessoas sem perder a qualidade da conversa.',
    name: 'Rafael Martins',
    role: 'Diretor comercial',
  },
  {
    quote: 'O que mais surpreendeu foi a naturalidade das respostas. Os clientes recebem orientação mesmo fora do horário comercial e chegam até nós já sabendo qual solução procuram.',
    name: 'Camila Oliveira',
    role: 'Empreendedora',
  },
]

function VideoSection() {
  return <section className="section video-section" aria-labelledby="video-title"><div className="container"><div className="center-heading"><span className="kicker">Demonstração</span><h2 id="video-title">Veja a Synapti trabalhando.</h2><p>Espaço preparado para receber o vídeo oficial da plataforma.</p></div><div className="video-placeholder"><button type="button" aria-label="Vídeo demonstrativo em breve" disabled><Play fill="currentColor"/></button><span>Vídeo demonstrativo em breve</span></div></div></section>
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const viewportRef = useRef(null)
  const carouselDrag = useRef(null)
  const slots = testimonialExamples
  const updateCurrent = (event) => setCurrent(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))
  useEffect(() => {
    const timer = setInterval(() => {
      if (!viewportRef.current || carouselDrag.current) return
      setCurrent(index => {
        const next = (index + 1) % slots.length
        viewportRef.current.scrollTo({ left: next * viewportRef.current.clientWidth, behavior: 'smooth' })
        return next
      })
    }, 5500)
    return () => clearInterval(timer)
  }, [slots.length])
  const startDrag = (event) => { event.currentTarget.setPointerCapture(event.pointerId); carouselDrag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft } }
  const moveDrag = (event) => { if (carouselDrag.current) event.currentTarget.scrollLeft = carouselDrag.current.scroll - (event.clientX - carouselDrag.current.x) }
  const endDrag = (event) => { carouselDrag.current = null; const page = Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth); event.currentTarget.scrollTo({ left: page * event.currentTarget.clientWidth, behavior: 'smooth' }) }
  return <section className="section testimonials" aria-labelledby="testimonials-title"><div className="container"><div className="section-heading"><div><span className="kicker">Experiências de atendimento</span><h2 id="testimonials-title">Histórias que inspiram resultados.</h2></div><span className="drag-hint">Arraste para o lado</span></div><div className="testimonial-viewport" ref={viewportRef} onScroll={updateCurrent} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}><div className="testimonial-track">{slots.map(item => <article className="testimonial-card" key={item.name}><Quote/><blockquote>“{item.quote}”</blockquote><div className="testimonial-person"><span><Users/></span><div><b>{item.name}</b><small>{item.role} · Relato ilustrativo</small></div></div></article>)}</div></div><div className="carousel-dots" aria-hidden="true">{slots.map((item, index) => <i className={index === current ? 'active' : ''} key={item.name}/>)}</div></div></section>
}

function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(null)
  const drag = useRef(null)

  useEffect(() => {
    const clamp = (point) => ({ x: Math.max(12, Math.min(point.x, window.innerWidth - 68)), y: Math.max(12, Math.min(point.y, window.innerHeight - 80)) })
    let initial = { x: window.innerWidth - 80, y: window.innerHeight - 92 }
    try {
      const saved = JSON.parse(localStorage.getItem('synapti-chat-position'))
      if (saved?.xRatio != null) initial = { x: saved.xRatio * window.innerWidth, y: saved.yRatio * window.innerHeight }
    } catch { localStorage.removeItem('synapti-chat-position') }
    setPosition(clamp(initial))
    const onResize = () => setPosition(point => point ? clamp(point) : point)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onPointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { startX: event.clientX, startY: event.clientY, x: position.x, y: position.y, moved: false }
  }
  const onPointerMove = (event) => {
    if (!drag.current) return
    const dx = event.clientX - drag.current.startX
    const dy = event.clientY - drag.current.startY
    if (Math.abs(dx) + Math.abs(dy) > 5) drag.current.moved = true
    setPosition({ x: Math.max(12, Math.min(drag.current.x + dx, window.innerWidth - 68)), y: Math.max(300, Math.min(drag.current.y + dy, window.innerHeight - 68)) })
  }
  const onPointerUp = () => {
    if (!drag.current) return
    if (!drag.current.moved) setOpen(value => !value)
    localStorage.setItem('synapti-chat-position', JSON.stringify({ xRatio: position.x / window.innerWidth, yRatio: position.y / window.innerHeight }))
    drag.current = null
  }

  if (!position) return null
  return <div className={`floating-chat ${position.x < window.innerWidth / 2 ? 'floating-chat--left' : ''} ${position.y < 330 ? 'floating-chat--top' : ''}`} style={{ left: position.x, top: position.y }}>
    {open && <div className="floating-chat__panel" role="dialog" aria-label="Fale com a Synapti"><button className="floating-chat__close" onClick={() => setOpen(false)} aria-label="Fechar chat"><X size={17}/></button><div className="floating-chat__avatar"><Bot size={22}/><i/></div><b>Olá! Como podemos ajudar?</b><p>Fale agora com um especialista da Synapti pelo WhatsApp.</p><a href={whatsApp('Olá! Vim pelo site da Synapti.')} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Iniciar conversa</a></div>}
    <button className="floating-chat__trigger" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} aria-label={open ? 'Fechar atendimento' : 'Abrir atendimento'} aria-expanded={open}>{open ? <X/> : <MessageCircle/>}</button>
  </div>
}

function FAQSection() {
  const [open, setOpen] = useState(null)
  return <section className="section faq" aria-labelledby="faq-title"><div className="container faq__grid"><div><span className="kicker">Dúvidas frequentes</span><h2 id="faq-title">Tudo o que você precisa saber.</h2><p>Estrutura pronta para receber as respostas oficiais da SYNAPTI.</p></div><div className="accordion">{faqPlaceholders.map((item, index) => { const active = open === index; return <article className={active ? 'accordion__item active' : 'accordion__item'} key={item.question}><button type="button" onClick={() => setOpen(active ? null : index)} aria-expanded={active} aria-controls={`faq-answer-${index}`}><span>{item.question}</span><Plus/></button><div className="accordion__answer" id={`faq-answer-${index}`}><p>{item.answer}</p></div></article> })}</div></div></section>
}

function AnimatedNumber({ value, suffix = '' }) {
  const [number, setNumber] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const animate = (now) => {
        const progress = Math.min((now - start) / 1400, 1)
        setNumber(Math.round(value * (1 - Math.pow(1 - progress, 3))))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
      observer.disconnect()
    }, { threshold: .5 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])
  return <strong ref={ref}>{number.toLocaleString('pt-BR')}{suffix}</strong>
}

function TypewriterBrand() {
  const messages = ['SYNAPTI', 'Quem responde primeiro, fecha primeiro.']
  const [messageIndex, setMessageIndex] = useState(0)
  const [visibleText, setVisibleText] = useState('')

  useEffect(() => {
    const message = messages[messageIndex]
    if (visibleText.length < message.length) {
      const timer = setTimeout(() => setVisibleText(message.slice(0, visibleText.length + 1)), messageIndex === 0 ? 130 : 58)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      setVisibleText('')
      setMessageIndex(index => (index + 1) % messages.length)
    }, messageIndex === 0 ? 1200 : 2600)
    return () => clearTimeout(timer)
  }, [messageIndex, visibleText])

  return <span className={`typewriter ${messageIndex === 1 ? 'typewriter--phrase' : ''}`} aria-hidden="true"><span>{visibleText}</span><i/></span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    let frame
    const moveGlow = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--pointer-x', `${event.clientX}px`)
        root.style.setProperty('--pointer-y', `${event.clientY}px`)
      })
    }
    window.addEventListener('pointermove', moveGlow, { passive: true })
    return () => { window.removeEventListener('pointermove', moveGlow); cancelAnimationFrame(frame) }
  }, [])

  useEffect(() => {
    const revealItems = document.querySelectorAll(
      '.section-heading, .center-heading, .workflow__intro, .feature-card, .steps article, .metrics__grid > div, .plan, .live-test__card > div, .contact__grid > div, .contact form'
    )

    revealItems.forEach((item, index) => {
      item.classList.add('reveal')
      item.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`)
    })

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealItems.forEach(item => item.classList.add('reveal--visible'))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('reveal--visible')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })

    revealItems.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  const sendEmail = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Novo contato pelo site: ${data.get('name')}`)
    const body = encodeURIComponent(`Nome: ${data.get('name')}\nE-mail: ${data.get('email')}\n\nMensagem:\n${data.get('message')}`)
    window.location.href = `mailto:contato@synapti.com.br?subject=${subject}&body=${body}`
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="app">
      <div className="meteor-field" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => <i key={index} />)}
      </div>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="container nav__inner">
          <a className="nav__wordmark" href="#inicio" aria-label="SYNAPTI — início"><TypewriterBrand /></a>
          <nav className={menuOpen ? 'nav__links nav__links--open' : 'nav__links'} aria-label="Navegação principal">
            <a href="#solucao" onClick={closeMenu}>Solução</a>
            <a href="#como-funciona" onClick={closeMenu}>Como funciona</a>
            <a href="#planos" onClick={closeMenu}>Planos</a>
            <a href="#contato" onClick={closeMenu}>Contato</a>
            <a className="button button--small" href={whatsApp('Olá! Quero conhecer a Synapti.')} target="_blank" rel="noreferrer">Falar com especialista <ArrowRight size={16}/></a>
          </nav>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero__glow" />
          <div className="container hero__grid">
            <div className="hero__content">
              <div className="hero__identity">
                <img className="hero__logo" src={logoUrl} alt="SYNAPTI — Tecnologia, inovação e inteligência" />
                <div className="eyebrow"><span/> Inteligência artificial para WhatsApp</div>
              </div>
              <h1><span>Converse melhor.</span><em>Venda mais.</em></h1>
              <p>A Synapti transforma seu WhatsApp em uma operação de atendimento rápida, inteligente e disponível o tempo todo.</p>
              <div className="hero__actions">
                <a className="button" href={whatsApp('Olá! Quero testar o atendimento inteligente da Synapti.')} target="_blank" rel="noreferrer">Testar agora <ArrowRight size={19}/></a>
                <a className="text-link" href="#como-funciona">Ver como funciona <ChevronRight size={17}/></a>
              </div>
              <div className="hero__trust"><span><Check size={15}/> Configuração simples</span><span><Check size={15}/> Sem cartão de crédito</span></div>
            </div>

            <div className="demo-card" aria-label="Demonstração de conversa automatizada">
              <div className="demo-card__top">
                <div className="avatar"><Bot size={22}/><i/></div>
                <div><b>Assistente Synapti</b><small><span/> online agora</small></div>
                <MessageCircle size={22}/>
              </div>
              <div className="chat">
                <div className="message message--client">Olá! Gostaria de saber mais sobre os planos.</div>
                <div className="message message--bot">Oi, Marina! 👋 Claro. Encontrei a melhor opção para o seu negócio.</div>
                <div className="offer"><span><Sparkles size={16}/> Recomendado para você</span><b>Plano Profissional</b><small>Atendimento completo com IA</small><button>Quero conhecer <ArrowRight size={14}/></button></div>
                <div className="typing"><i/><i/><i/></div>
              </div>
              <div className="floating-badge"><Zap size={18}/><span><b>2,4 segundos</b><small>tempo de resposta</small></span></div>
            </div>
          </div>
        </section>

        <section className="logos-strip" aria-label="Espaço para empresas e segmentos atendidos"><div className="container"><span>Tecnologia utilizada por empresas que querem vender mais.</span><div><b>SKYFIT</b><b>CLÍNICAS</b><b>IMOBILIÁRIAS</b><b>ESCOLAS</b><b>LOJAS</b></div></div></section>

        <section className="section" id="solucao">
          <div className="container">
            <div className="section-heading"><div><span className="kicker">Uma operação mais inteligente</span><h2>Seu atendimento trabalhando<br/>mesmo quando você não está.</h2></div><p>Automatize o repetitivo sem perder a proximidade. Sua equipe ganha tempo e seus clientes ganham respostas.</p></div>
            <div className="feature-grid">{features.map(({ icon: Icon, title, text }, i) => <article className="feature-card" key={title}><span className="feature-card__number">0{i + 1}</span><div className="icon-box"><Icon/></div><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className="section workflow" id="como-funciona">
          <div className="container workflow__grid">
            <div className="workflow__intro"><span className="kicker">Simples de verdade</span><h2>Da primeira mensagem à oportunidade.</h2><p>A Synapti recebe, entende e conduz cada conversa de forma natural.</p><a className="text-link" href={whatsApp('Olá! Quero ver uma demonstração da Synapti.')} target="_blank" rel="noreferrer">Agendar demonstração <ArrowRight size={17}/></a></div>
            <div className="steps">
              <article><span>01</span><div><h3>O cliente manda uma mensagem</h3><p>Pelo mesmo WhatsApp que ele já usa todos os dias.</p></div><MessageCircle/></article>
              <article><span>02</span><div><h3>A IA entende a necessidade</h3><p>Identifica a intenção e consulta as informações do negócio.</p></div><BrainCircuit/></article>
              <article><span>03</span><div><h3>A conversa vira resultado</h3><p>Responde, qualifica e direciona para o próximo passo.</p></div><BarChart3/></article>
            </div>
          </div>
        </section>

        <section className="metrics"><div className="container metrics__grid"><div><AnimatedNumber value={120} suffix="+"/><span>empresas atendidas</span></div><div><AnimatedNumber value={800} suffix=" mil"/><span>conversas realizadas</span></div><div><AnimatedNumber value={15} suffix=" mil"/><span>vendas recuperadas</span></div><div><AnimatedNumber value={24} suffix="/7"/><span>disponibilidade</span></div></div></section>

        <section className="section pricing" id="planos">
          <div className="container"><div className="center-heading"><span className="kicker">Planos que acompanham você</span><h2>Comece agora. Cresça sem limites.</h2><p>Escolha a estrutura ideal para o momento do seu negócio.</p></div>
            <div className="plans">{plans.map(plan => <article className={`plan ${plan.featured ? 'plan--featured' : ''}`} key={plan.name}>{plan.featured && <span className="popular">Mais escolhido</span>}<h3>{plan.name}</h3><p>{plan.desc}</p><div className="price">{plan.price ? <><small>R$</small><strong>{plan.price}</strong><span>/mês</span></> : <strong>Personalizado</strong>}</div><ul>{plan.items.map(item => <li key={item}><Check size={16}/>{item}</li>)}</ul><a className={plan.featured ? 'button' : 'button button--outline'} href={whatsApp(`Olá! Tenho interesse no plano ${plan.name} da Synapti.`)} target="_blank" rel="noreferrer">{plan.price ? 'Escolher plano' : 'Falar com consultor'} <ArrowRight size={17}/></a></article>)}</div>
          </div>
        </section>

        <section className="section live-test"><div className="container live-test__card live-test__card--without-qr"><div><span className="kicker">Teste ao vivo</span><h2>Não fique só na promessa.<br/>Converse com a nossa IA.</h2><p>Clique no botão e experimente agora o atendimento inteligente da Synapti pelo WhatsApp.</p><a className="button" href={whatsApp('Olá! Vim pelo site e quero testar a Synapti.')} target="_blank" rel="noreferrer"><MessageCircle size={19}/> Abrir no WhatsApp</a></div></div></section>

        <VideoSection />
        <TestimonialsSection />
        <FAQSection />

        <section className="section contact" id="contato"><div className="container contact__grid"><div><span className="kicker">Vamos conversar</span><h2>Pronto para transformar seu atendimento?</h2><p>Conte um pouco sobre seu negócio. Nossa equipe entra em contato para mostrar a melhor solução.</p><div className="contact__info"><a href="tel:+5519991197862"><Phone/> +55 19 99119-7862</a><a href="mailto:contato@synapti.com.br"><Mail/> contato@synapti.com.br</a></div></div><form onSubmit={sendEmail}><label>Seu nome<input name="name" placeholder="Como podemos chamar você?" required/></label><label>Seu melhor e-mail<input name="email" type="email" placeholder="voce@empresa.com" required/></label><label>Como podemos ajudar?<textarea name="message" placeholder="Conte um pouco sobre sua necessidade" required/></label><label className="consent"><input name="emailConsent" type="checkbox" required/><span>Concordo em receber comunicações da SYNAPTI por e-mail e autorizo o tratamento dos meus dados para essa finalidade, conforme a LGPD. Posso retirar meu consentimento a qualquer momento.</span></label><button className="button" type="submit">Enviar mensagem <Send size={18}/></button></form></div></section>
      </main>

      <footer><div className="container footer__top"><div><a className="brand brand--image" href="#inicio" aria-label="SYNAPTI — início"><img src={logoUrl} alt="" /></a><p>Conversas inteligentes.<br/>Negócios mais humanos.</p></div><div><b>Produto</b><a href="#solucao">Solução</a><a href="#como-funciona">Como funciona</a><a href="#planos">Planos</a></div><div><b>Contato</b><a href="mailto:contato@synapti.com.br">E-mail</a><a href={whatsApp('Olá! Vim pelo site da Synapti.')} target="_blank" rel="noreferrer">WhatsApp</a></div><div className="security"><ShieldCheck/><span><b>Seus dados protegidos</b><small>Segurança em cada conversa</small></span></div></div><div className="container footer__bottom"><span>© 2026 Synapti Sistemas. Todos os direitos reservados.</span><span>Feito com inteligência e propósito.</span></div></footer>
      <FloatingChat />
    </div>
  )
}

export default App
