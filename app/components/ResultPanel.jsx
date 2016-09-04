import React from 'react';
import _ from 'lodash';

import ReactTooltip from 'react-tooltip';
// import TripReportResults from './TripReportResults'
import TripReportResults from '../containers/TripReports';
import {trackOutboundLink} from '../ga';


const placeProp = React.PropTypes.object;

const ResearchLinkGroup = props => (
     <div className="research-link-group">
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
                className="site"
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
        <div className="research-suggestions">
            <h1 className="section-title">{place.name} Research</h1>
            {groupElements}
            <ReactTooltip
                place="bottom"
                type="light"
                effect="solid"
                className="research-suggestions-tooltip"
            />
        </div>
    );
};

ResearchSuggestions.propTypes = {place: placeProp};

const FeedbackMessage = () => {
    return (
        <p>
        Thanks for playing!
        Drop us some <a href="https://docs.google.com/document/d/1s91RrNYWmucPVacHv7GkcTUHQmXTvpcIk0xGPHxJZ3A/edit?usp=sharing" target="_new">feedback</a>!
        </p>
    );
};

const ResultPanel = props => {
    const content = _.isUndefined(props.place.id) ?
        null :
        <span>
            <ResearchSuggestions place={props.place} />
            <TripReportResults />
            <FeedbackMessage />
        </span>;

    return <div className="main-content">{content}</div>;
};

ResultPanel.propTypes = {
    place: React.PropTypes.object,
};

export default ResultPanel;
