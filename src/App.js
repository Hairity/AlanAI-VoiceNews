import React, { useState, useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'

import wordsToNumbers from 'words-to-numbers'

import NewsCards from './componenets/NewsCards/NewsCards'
import useStyles from './styles.js'
import alan from '../src/componenets/NewsCards/image/alan.png'


const alanKey = '644e0cd8c4cd49215c5ff03f17feed042e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {
  const [newsArticles, setNewsArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(-1)
  const classes = useStyles()

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if(command === 'newHeadlines') {
          setNewsArticles(articles)
          setActiveArticle(-1)
        } else if(command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1 )
        } else if(command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number
          const article = articles[parsedNumber - 1]

          if(parsedNumber > 20) {
            alanBtn().playText('Please try that again')
          } else if(article)
            window.open(articles[number].url, '_blank')
            alanBtn().playText('Opening')

        }
      }
    })
  }, [])

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src={alan} className={classes.alanLogo} alt='Alan AI logo' />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  )
}

export default App