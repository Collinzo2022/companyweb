import { useState, useEffect } from 'react'

export function useTypewriter(words, typingSpeed = 100, deletingSpeed = 50, delayBetweenWords = 2000) {
    const [text, setText] = useState('')
    const [wordIndex, setWordIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const currentWord = words[wordIndex]

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (text.length < currentWord.length) {
                    setText(currentWord.slice(0, text.length + 1))
                } else {
                    setTimeout(() => setIsDeleting(true), delayBetweenWords)
                }
            } else {
                if (text.length > 0) {
                    setText(currentWord.slice(0, text.length - 1))
                } else {
                    setIsDeleting(false)
                    setWordIndex((prev) => (prev + 1) % words.length)
                }
            }
        }, isDeleting ? deletingSpeed : typingSpeed)

        return () => clearTimeout(timer)
    }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords])

    return text
}
