// 'use client'

export default function myImageLoader({ src, width, quality }) {
    if (!src || !src.includes("https://admin.glamcode.in")) return src
    console.log('src, width, quality', src, width, quality)
    return `${src}?w=${width}&q=${quality || 75}`
    // return `https://admin.glamcode.in/${src}?w=${width}&q=${quality || 75}`
}