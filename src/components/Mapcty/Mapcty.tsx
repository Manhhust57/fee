import React from "react";
import "./Mapcty.css";
const Mapcty = () => {
  return (
    <div className="map-cty-main">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.9798910304207!2d107.00014641103532!3d20.953322680596486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a5fbce3525b65%3A0xeb9eed19f0f52778!2sAnstay%20Residence%20by%20A%20La%20Carte%20H%E1%BA%A1%20Long!5e0!3m2!1svi!2s!4v1758160741455!5m2!1svi!2s"
        width="1920px"
        height="500px"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Cinema Location Map"
      ></iframe>
    </div>
  );
};

export default Mapcty;
