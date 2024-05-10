import fs from 'fs'
import path from 'path'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug

  const filePath = path.join(process.cwd(), 'prisma/imagesCloud/', slug)
  const file = fs.readFileSync(filePath)

  return new Response(file, {
    status: 200,
    headers: { 'Content-Type': 'image/jpeg' },
  })
}
