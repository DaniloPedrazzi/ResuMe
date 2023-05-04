import { useState, useEffect } from "react"
import { copy, linkIcon, loader, tick } from "../assets"
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  // Variável do artigo atual
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  });

  // Variável com todos os artigos
  const [allArticles, setAllArticles] = useState([]);

  
  //Variável para chamar a API
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  
  // Carrega todos os arquivos do localStorage para a variável allArticles (inicia-se no primeiro render)
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));
    
    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage);
    }
  }, [])
  
  //Chama quando aperta o botão principal
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //Chama a API
    const { data } = await getSummary({articleUrl: article.url});
    
    if(data?.summary){
      //Pega o retorno da API e coloca na variável article
      const newArticle = {...article, summary: data.summary};
      setArticle(newArticle);
      
      //Pega o novo artigo e coloca na lista de todos os artigos
      const updatedAllArticles = [newArticle, ...allArticles];
      setAllArticles(updatedAllArticles);
      
      //Salva a lista de todos os artigos no localStorage
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  }

  // Variável que armazena o link copiado
  const [copied, setCopied] = useState("");
  
  //Seta a copyUrl (durante 3s) como o link do artigo e copia para a área de transferência
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form onSubmit={handleSubmit} className="relative flex justify-center items-center">
          <img src={linkIcon} alt="copy link" className="absolute left-0 my-2 ml-3 w-5"/>
          <input type="url" placeholder="URL do artigo" value={article.url} onChange={(e) => setArticle({... article, url: e.target.value})} required className="url_input peer"/>
          <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">↵</button>
        </form>
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {allArticles.reverse().map((item, index) => (
              <div key={`link-${index}`} onClick={() => setArticle(item)} className="link_card">
                <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                  <img src={copied === item.url ? tick : copy} alt="copy_icon" className="w-[40%] h-[40%] object-contain"/>
                </div>
                  <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{item.url}</p>
              </div>
            ))}
          </div>
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
      {isFetching ? ( //Se estiver carregando, mostra o loader
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? ( //Se der erro, mostra o erro
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : ( //Se não tiver erro, e tiver resumo, mostra o resumo
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
              <span className='purple_gradient'>Resumo </span> do Artigo
              </h2>
              <div>
                <p className='font-inter font-medium text-sm text-gray-400'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo