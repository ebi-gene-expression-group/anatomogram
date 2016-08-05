"use strict";
//*------------------------------------------------------------------*

//*------------------------------------------------------------------*

//Using Ensembl and Ensembl Plants species

var svgsForSpecies = {
    "anolis carolinensis": "anolis_carolinensis.svg",
    "arabidopsis thaliana": "arabidopsis_thaliana_whole_plant.svg",
    "bos taurus": "cow.svg",
    "brachypodium distachyon": {
        "flower_parts": "brachypodium_distachyon_flower_parts.svg",
        "whole_plant": "brachypodium_distachyon_whole_plant.svg"
    },
    "gallus gallus": "chicken.svg",
    "homo sapiens": {
        "brain": "human_brain.svg",
        "female": "human_female.svg",
        "male": "human_male.svg"
    },
    "hordeum vulgare": {
        "flower_parts": "hordeum_vulgare_flower_parts.svg",
        "whole_plant": "hordeum_vulgare_whole_plant.svg"
    },
    "hordeum vulgare subsp. vulgare": {
        "flower_parts": "hordeum_vulgare_flower_parts.svg",
        "whole_plant": "hordeum_vulgare_whole_plant.svg"
    },
    "macaca mulatta": "macaca_mulatta.svg",
    "monodelphis domestica": "monodelphis_domestica.svg",
    "mus musculus": {
        "brain": "mouse_brain.svg",
        "female": "mouse_female.svg",
        "male": "mouse_male.svg"
    },
    "oryza sativa": {
        "flower_parts": "oryza_sativa_flower_parts.svg",
        "whole_plant": "oryza_sativa_whole_plant.svg"
    },
    "oryza sativa japonica group": {
        "flower_parts": "oryza_sativa_flower_parts.svg",
        "whole_plant": "oryza_sativa_whole_plant.svg"
    },
    "papio anubis": "papio_anubis.svg",
    "rattus norvegicus": "rat.svg",
    "solanum lycopersicum": {
        "flower_parts": "solanum_lycopersicum_flower_parts.svg",
        "whole_plant": "solanum_lycopersicum_whole_plant.svg"
    },
    "sorghum bicolor": {
        "flower_parts": "sorghum_bicolor_flower_parts.svg",
        "whole_plant": "sorghum_bicolor_whole_plant.svg"
    },
    "triticum aestivum": {
      "flower_parts": "triticum_aestivum_flower_parts.svg",
      "whole_plant": "triticum_aestivum_whole_plant.svg"
    },
    "tetraodon nigrovirdis": "tetraodon_nigroviridis.svg",
    "xenopus tropicalis": "xenopus_tropicalis.svg",
    "zea mays": {
        "flower_parts": "zea_mays_flower_parts.svg",
        "whole_plant": "zea_mays_whole_plant.svg"
    }
};

var _anatomogramFile = function(path){
  return require('../assets/svg/'+path);
}

var getSvgsForSpecies = function(species){
  var v = svgsForSpecies[species];
  var result = {};
  if(typeof v === 'object'){
    for(var anatomomogramType in v){
      if(v.hasOwnProperty(anatomomogramType)){
        result[anatomomogramType] = _anatomogramFile(v[anatomomogramType]);
      }
    }
  } else if (typeof v === 'string'){
    result["svg"] = _anatomogramFile(v);
  }
  return result;
}

//*------------------------------------------------------------------*

module.exports = getSvgsForSpecies;
