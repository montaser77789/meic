import React from 'react'

const Sectiontitle = ({title , description} :{title : string , description : string}) => {
  return (
      <div className="text-center mx-auto">
        <h2 className="text-2xl md:text-5xl font-bold text-primary">
          {title}
        </h2>
        <p className="text-lg md:text-2xl font-medium text-[#000000] mt-4">
          {description}
        </p>
      </div>
  )
}

export default Sectiontitle
