import { useState, useEffect } from "react"
import { copy, linkIcon, loader, tick } from "../assets"
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  const [article, setarticle] = useState({
    url: '',
    summary: ''
  });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { data } = await getSummary({articleUrl: article.url});

    if(data?.summary){
      const newArticle = {...article, summary: data.summary};

      setarticle = newArticle;
    }
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form onSubmit={handleSubmit} className="relative flex justify-center items-center">
          <img src={linkIcon} alt="copy link" className="absolute left-0 my-2 ml-3 w-5"/>
          <input type="url" placeholder="URL do artigo" value="" onChange={(e) => setarticle({... article, url: e.target.value})} required className="url_input peer"/>
          <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">↵</button>
        </form>

      </div>
    </section>
  )
}

export default Demo