import React from 'react';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';
import {trackOutboundLink} from '../ga';

import ContainerWithTitle from './ContainerWithTitle';
import styles from './ResearchSuggestions.scss';


const ResearchLinkGroup = props => (
     <div className={styles.researchLinkGroup}>
        <h3>{props.title}</h3>
        <ul>
            {props.children}
        </ul>
    </div>
);

ResearchLinkGroup.propTypes = {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
};

const ResearchLink = props => {
    const onClick = () => trackOutboundLink(props.url);
    const descriptionProps = props.description ? {'data-tip': props.description} : {};
    return (
        <li>
            <a
                href={props.url}
                onClick={onClick}
                target="_blank"
                className={styles.site}
                {...descriptionProps}
            >
                {props.siteName}
            </a>
        </li>
    );
};

ResearchLink.propTypes = {
    siteName: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    url: React.PropTypes.string.isRequired,
};

const routeDescriptions = 'Route Descriptions';
const mapsCategory = 'Maps';
const weatherCategory = 'Weather';

const ResearchSuggestions = props => {
    const place = props.place;

    const links = [
        {
            site: 'SummitPost',
            category: routeDescriptions,
            description: 'Curated mountain and route descriptions written by experts.',
            url: `http://www.summitpost.org/object_list.php?object_type=1&object_name_1=${place.namePlussed}`,
        },
        {
            site: 'Washington Trails',
            category: routeDescriptions,
            description: 'Trip reports and route descriptions generally aimed at hikers rather than mountain climbers.',
            url: `http://www.wta.org/go-hiking/hikes/hike_search?title=${place.namePlussed}`,
        },
        {
            site: 'Weather.gov',
            category: weatherCategory,
            description: 'Detailed weather reports and graphs pinpointed to your peak\'s location.',
            url: `http://forecast.weather.gov/MapClick.php?lon=${place.lon}&lat=${place.lat}`,
        },
        {
            site: 'Mountain-Forecast',
            category: weatherCategory,
            description: 'Peak-specific weather reports with forecasts at various altitudes.',
            url: `http://www.mountain-forecast.com/peaks/${place.nameHypenated}`,
        },
        {
            site: 'CalTopo',
            category: mapsCategory,
            description: 'Swiss army knife of online mapping software - has slope-angle overlays, simulated point-of-view generation, and the best printing abilities.',
            url: `http://caltopo.com/map.html#ll=${place.lat},${place.lon}&z=14&b=t`,
        },
        {
            site: 'Google',
            category: mapsCategory,
            description: 'The search juggernaut\'s mapping software. Has a crude topographic view, but driving directions are really where it shines.',
            url: `https://www.google.com/maps/place/${place.formatted_address}/@${place.lat},${place.lon},12z/data=!5m1!1e4`,
        },
    ];
    const groups = _.groupBy(
        links,
        'category'
    );
    const groupElements = _.map(
        groups,
        (groupLinks, groupName) => {
            return (
                <ResearchLinkGroup title={groupName} key={groupName}>
                    {_.map(
                        groupLinks,
                        link => {
                            return (
                                <ResearchLink
                                    siteName={link.site}
                                    url={link.url}
                                    description={link.description}
                                    key={link.site + link.url}
                                />
                            );
                        }
                    )}
                </ResearchLinkGroup>
            );
        }
    );

    return (
        <ContainerWithTitle title={`${place.name} Research`}>
            {groupElements}
            <ReactTooltip
                place="bottom"
                type="light"
                effect="solid"
                className={styles.researchSuggestionsTooltip}
            />
        </ContainerWithTitle>
    );
};


ResearchSuggestions.propTypes = {
    place: React.PropTypes.object,
};

export default ResearchSuggestions;
