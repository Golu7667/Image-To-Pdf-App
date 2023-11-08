
export default function   Download(){
    reurn (
        <div>
        <h2>Your PDF is ready!</h2>
        <iframe
          src={pdf.output('bloburl')}
          width="100%"
          height="600px"
          title="Converted PDF"
        ></iframe>
      </div>
    )
}