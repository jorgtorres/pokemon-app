const pokemonTypeColor = (type: string) => {
  switch (type) {
    case "bug":
      return "#A7B723";
    case "dark":
      return "#75574C";
    case "dragon":
      return "#7037FF";
    case "electric":
      return "#F9CF30";
    case "fairy":
      return "#E69EAC";
    case "fighting":
      return "#C12239";
    case "fire":
      return "#F57D31";
    case "flying":
      return "#A891EC";
    case "ghost":
      return "#70559B";
    case "normal":
      return "#AAA67F";
    case "grass":
      return "#74CB48";
    case "ground":
      return "#DEC16B";
    case "ice":
      return "#9AD6DF";
    case "poison":
      return "#A43E9E";
    case "psychic":
      return "#FB5584";
    case "rock":
      return "#B69E31";
    case "steel":
      return "#B7B9D0";
    case "water":
      return "#6493EB";
    default:
      return "#A7B723";
  }
};

export default pokemonTypeColor;
