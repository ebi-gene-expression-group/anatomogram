"use strict";
//*------------------------------------------------------------------*

//*------------------------------------------------------------------*

//Using Ensembl and Ensembl Plants species

var svgsForSpecies = {
	"homo sapiens": {
		male: "human_male.svg",
		female: "human_female.svg",
		brain: "human_brain.svg"
	},
	"mus musculus": {
		male: "mouse_male.svg",
		female: "mouse_female.svg",
		brain: "mouse_brain.svg",
	},
	"gallus gallus": "chicken.svg",
	"bos taurus": "cow.svg",
	"rattus norvegicus": "rat.svg",
	"anolis carolinensis": "anolis_carolinensis.svg",
	"xenopus tropicalis": "xenopus_tropicalis.svg",
	"tetraodon nigrovirdis": "tetraodon_nigroviridis.svg",
	"macaca mulatta": "macaca_mulatta.svg",
	"monodelphis domestica": "monodelphis_domestica.svg",
	"papio anubis": "papio_anubis.svg",
	"oryza sativa japonica group": {
		"whole_plant": "oryza_sativa_whole_plant.svg",
		"flower_parts": "oryza_sativa_flower_parts.svg"
	},
	"oryza sativa": {
		"whole_plant": "oryza_sativa_whole_plant.svg",
		"flower_parts": "oryza_sativa_flower_parts.svg"
	},
	"hordeum vulgare subsp. vulgare": {
		"whole_plant": "hordeum_vulgare_whole_plant.svg",
		"flower_parts": "hordeum_vulgare_flower_parts.svg"
	},
	"hordeum vulgare": {
		"whole_plant": "hordeum_vulgare_whole_plant.svg",
		"flower_parts": "hordeum_vulgare_flower_parts.svg"
	},
	"zea mays": {
		"whole_plant": "zea_mays_whole_plant.svg",
		"flower_parts": "zea_mays_flower_parts.svg"
	},
	"sorghum bicolor": {
		"whole_plant": "sorghum_bicolor_whole_plant.svg",
		"flower_parts": "sorghum_bicolor_flower_parts.svg"
	},
	"arabidopsis thaliana": "arabidopsis_thaliana_whole_plant.svg",
	"solanum lycopersicum": {
		"whole_plant": "solanum_lycopersicum_whole_plant.svg",
		"flower_parts": "solanum_lycopersicum_flower_parts.svg"
	},
	"brachypodium distachyon": {
		"whole_plant": "brachypodium_distachyon_whole_plant.svg",
		"flower_parts": "brachypodium_distachyon_flower_parts.svg"
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
