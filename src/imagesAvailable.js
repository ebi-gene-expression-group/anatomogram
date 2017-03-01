import Url from 'url';
import Path from 'path';
import SvgsForSpecies from '../resources/json/svgsForSpecies.json';
import IdsForSvgs from '../resources/json/idsForSvgs.json';

const resolvePathToIcon = (pathToResources, type, selected) =>
    Url.resolve(
        pathToResources,
        Path.basename(require(`../resources/icons/${type}_${selected ? `` : `un`}selected.png`))
    );

const resolvePathToSvg = (pathToResources, svg) =>
    Url.resolve(
        pathToResources,
        Path.basename(require(`../resources/svg/${svg}`))
    );

const getSvgsForSpecies = (pathToResources, species) => {
    const svgEntry = SvgsForSpecies[species];
    if (typeof svgEntry === `object`) {
        return Object.keys(svgEntry).map(anatomogramType => (
            {
                type: anatomogramType,
                path: resolvePathToSvg(pathToResources, svgEntry[anatomogramType]),
                ids: IdsForSvgs[svgEntry[anatomogramType]]
            }
        ));
    } else if (typeof svgEntry === `string`) {
        return [{
            type: `svg`,
            path: resolvePathToSvg(pathToResources, svgEntry),
            ids: IdsForSvgs[svgEntry]
        }];
    } else {
        return [];
    }
};

export {getSvgsForSpecies, resolvePathToIcon};
