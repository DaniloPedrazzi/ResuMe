import logo from '../assets/logo.svg'


const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="ResuMe_logo" className="w-28 object-contain" />
        <a href="https://github.com/DaniloPedrazzi/ResuMe" target="_blank" className="highlight_btn">GitHub</a>
        {/* <button type="button" className="black_btn" onClick={() => {window.open("https://github.com/DaniloPedrazzi/ResuMe")}}>GitHub</button> */}
      </nav>
      <h1 className='head_text'>Resuma <br /> Artigos com <br />
      <span className='purple_gradient'>OpenAI GPT-4</span>
      </h1>
    </header>
  )
}

export default Hero