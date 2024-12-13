function Card({image, title, description})
{


const cardStyle = {
    card: {
      border: "1px solid #629584", 
      borderRadius: "10px",
      boxShadow: "5px 5px 5px hsla(0, 0%, 0%, 0.1)",
      padding: "20px",
      margin: "10px",
      textAlign: "center",
      maxWidth: "250px",
      display: "inline-block",
      marginBottom:"60px",
      cursor:"pointer"
    },
    image: {
      width: "150px",
      height: "150px",
    },
    cardImage: {
      maxWidth: "60%",
      height: "auto",
      marginBottom: "10px",
    },
    cardTitle: {
      fontFamily: "Arial, Helvetica, sans-serif",
      margin: "0",
      color: "#243642", 
    },
    cardText: {
      fontFamily: "Arial, Helvetica, sans-serif",
      fontWeight: "bold",
      color: "#243642", 
    },
  };
  

    return(
        <div className="card" style={cardStyle.card} >
             <img src={image} alt={title} style={cardStyle.image} />
            <div className="card-image" style={cardStyle.cardImage}></div>
            <h1 className="card-title" style={cardStyle.cardTitle}>{title}</h1>
            <p className="card-text" style={cardStyle.cardText}>{description}</p>
        </div>
    );
}

export default Card