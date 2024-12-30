import React, { useState } from "react";

const Veri = () => {
  const veri = [];
  const [veriler, setVeriler] = useState(veri);
  const [yakalananid, setYakalananid] = useState(1);
  const [yakalananuserid, setYakalananuserid] = useState("");
  const [yakalananbody, setYakalananbody] = useState("");
  const [yakalanantitle, setYakalanantitle] = useState("");
  const [duzenlenenVeri, setDuzenlenenVeri] = useState(false);
  const [duzenlenenId, setDuzenlenenId] = useState(null);
  const [hataMesaji, setHataMesaji] = useState("");

  const kaydet = () => {
    if (!yakalananuserid || !yakalananbody || !yakalanantitle) {
      setHataMesaji("Lütfen tüm alanları doldurun!");
      return;
    }

    if (duzenlenenVeri) {
      setVeriler(
        veriler.map((veri) =>
          veri.id === duzenlenenId
            ? {
                ...veri,
                userid: yakalananuserid,
                body: yakalananbody,
                title: yakalanantitle,
              }
            : veri
        )
      );
      setDuzenlenenVeri(false);
    } else {
      setVeriler([
        ...veriler,
        {
          id: yakalananid,
          userid: yakalananuserid,
          body: yakalananbody,
          title: yakalanantitle,
        },
      ]);
      setYakalananid(yakalananid + 1);
    }

    setYakalananuserid("");
    setYakalananbody("");
    setYakalanantitle("");
    setDuzenlenenId(null);
    setHataMesaji("");
  };

  const guncelle = (id) => {
    const veri = veriler.find((veri) => veri.id === id);
    if (veri) {
      setYakalananuserid(veri.userid);
      setYakalananbody(veri.body);
      setYakalanantitle(veri.title);
      setDuzenlenenId(id);
      setDuzenlenenVeri(true);
      setHataMesaji("");
    }
  };

  const sil = (id) => {
    setVeriler(veriler.filter((veri) => veri.id !== id));
  };

  return (
    <div className="container">
      <div className="kutu">
        {hataMesaji && <p style={{ color: "red" }}>{hataMesaji}</p>}
        <div>
          <input
            value={yakalananuserid}
            onChange={(e) => setYakalananuserid(e.target.value)}
            type="text"
            placeholder="userid"
          />
          <input
            value={yakalananbody}
            onChange={(e) => setYakalananbody(e.target.value)}
            type="text"
            placeholder="body"
          />
          <input
            value={yakalanantitle}
            onChange={(e) => setYakalanantitle(e.target.value)}
            type="text"
            placeholder="title"
          />
          <div className="buton-container">
            <button
              className="buton1"
              onClick={() => {
                setYakalananuserid("");
                setYakalanantitle("");
                setYakalananbody("");
                setDuzenlenenVeri(false);
                setDuzenlenenId(null);
                setHataMesaji("");
              }}
            >
              Temizle
            </button>
            <button className="buton2" onClick={kaydet}>
              {duzenlenenVeri ? "Güncelle" : "Ekle"}
            </button>
          </div>
        </div>
      </div>

      <div className="veri-listesi">
        {veriler.map((veri) => (
          <div className="kutu" key={veri.id}>
            <p>ID: {veri.id}</p>
            <p>UserID: {veri.userid}</p>
            <p>Body: {veri.body}</p>
            <p>Title: {veri.title}</p>
            <button className="buton-sil" onClick={() => sil(veri.id)}>
              Sil
            </button>
            <button className="buton-guncelle" onClick={() => guncelle(veri.id)}>
              Güncelle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Veri;
