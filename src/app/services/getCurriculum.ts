const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''
const accessToken = process.env.ACCESS_TOKEN ?? ''

export async function getCurriculum () {
  const res = await fetch('https://api.infojobs.net/api/2/curriculum', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}, Bearer ${accessToken}`
    }
  })

  // if (!res.ok) {
  //   throw new Error('Failed to fetch data')
  // }

  const code = await res.json()

  const data = await getCurriculumById(code)
  return data
}

async function getCurriculumById (code: string) {
  const curriculum = await fetch(`https://api.infojobs.net/api/1/curriculum/${code}/education`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}, Bearer ${accessToken}`
    }
  })

  return await curriculum.json()
}
