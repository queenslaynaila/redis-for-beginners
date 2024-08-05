'use server'

import { client } from '../lib/db'
import { redirect } from 'next/navigation'

export async function createBook(formData) {
  const {title, rating, author, blurb} = Object.fromEntries(formData)
  const id = Math.floor(Math.random() * 100000)
  const unique = await client.zAdd('books',{
    value:title,
    score:id
  }, { NX: true})
  if(!unique){
    return {error:"the book eciss"}
  }
  await client.hSet(`book:${id}`, {
    title,
    rating,
    author,
    blurb
  })
  redirect('/')
}