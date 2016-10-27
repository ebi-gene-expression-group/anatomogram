const Url = require(`url`);
const Path = require(`path`);
const SvgsForSpecies = require(`../resources/json/svgsForSpecies.json`);
const IdsForSvgs = require(`../resources/json/idsForSvgs.json`);

const ResolvePathToIcon = (pathToFolderWithBundledResources, type, selected) =>
    Url.resolve(
        pathToFolderWithBundledResources,
        Path.basename(require(`../resources/icons/${type}_${selected ? `` : `un`}selected.png`))
    );

const ResolvePathToSvg = (pathToFolderWithBundledResources, svg) =>
    Url.resolve(
        pathToFolderWithBundledResources,
        Path.basename(require(`../resources/svg/${svg}`))
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
    } else {
        return [];
    }
};

module.exports = {GetSvgsForSpecies, ResolvePathToIcon};
