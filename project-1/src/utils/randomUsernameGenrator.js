const genPass = (name) => {
  const nouns = ["Tiger", "Coder", "Ninja", "Falcon", "Wolf"];

  const rand = Math.floor(Math.random() * nouns.length);
  const num = Math.floor(Math.random() * 1000);

  const cleanName = name.replace(/\s+/g, "").toLowerCase();

  return `${nouns[rand]}_${cleanName}_${num}`;
};

export default genPass;