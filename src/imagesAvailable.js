const Path = require(`path`);
const SvgsForSpecies = require(`../assets/json/svgsForSpecies.json`);
const IdsForSvgs = require(`../assets/json/idsForSvgs.json`);

const ResolvePathToIcon = (pathToFolderWithBundledResources, type, selected) =>
  Path.resolve(
      pathToFolderWithBundledResources,
      Path.basename(require(`../assets/icons/${type}_${selected ? `` : `un`}selected.png`))
  );

const ResolvePathToSvg = (pathToFolderWithBundledResources, svg) =>
    Path.resolve(
        pathToFolderWithBundledResources,
        Path.basename(require(`../assets/svg/${svg}`))
    );

const GetSvgsForSpecies = (pathToFolderWithBundledResources, species) => {
  let svgEntry = SvgsForSpecies[species];
  if (typeof svgEntry === `object`) {
    return Object.keys(svgEntry).map(anatomogramType => (
        {
          type: anatomogramType,
          path: ResolvePathToSvg(pathToFolderWithBundledResources, svgEntry[anatomogramType]),
          ids: IdsForSvgs[svgEntry[anatomogramType]]
        }
    ));
  } else if (typeof svgEntry === `string`) {
    return [{
      type: `svg`,
      path: ResolvePathToSvg(pathToFolderWithBundledResources, svgEntry),
      ids: IdsForSvgs[svgEntry]
    }];
  }
};

module.exports = {GetSvgsForSpecies, ResolvePathToIcon};
