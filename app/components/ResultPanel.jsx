import React from 'react';
import _ from 'lodash';

import SearchedPlaceStore from '../store/SearchedPlaceStore'
import {trackOutboundLink} from '../ga'
import get_peakbagger_link from '../sites/peakbagger'


var placeProp = {place: React.PropTypes.object.isRequired};

var TargetSummary = React.createClass({
    propTypes: placeProp,
    render(){
        var place = this.props.place
        return <div>
            Target: <strong>{place.name}</strong>, <i>{place.types[0].replace('_', ' ')} </i> 
            located at ({place.latShort}, {place.lonShort})
        </div>
    }
})


const ResearchLinkGroup = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        children: React.PropTypes.node.isRequired,
    },
    render(){
        return <div className="research-link-group">
            <h3>{this.props.title}</h3>
            <ul>
                {this.props.children}
            </ul>
        </div>
    }
})

var ResearchLink = React.createClass({
    propTypes: {
        siteName: React.PropTypes.string.isRequired,
        description: React.PropTypes.string,
        url: React.PropTypes.string.isRequired,
    },
    render(){
        const onClick = () => trackOutboundLink(this.props.url);
        const descriptionProps = this.props.description ?
            {title: this.props.description} : {}
        return <li>
            <a 
                href={this.props.url}
                onClick={onClick}
                target="_blank"
                className="site"
                {...descriptionProps}
            >
                {this.props.siteName}
            </a>
        </li>
    }
})

const betaTrsCategory = 'Beta & Trip Reports';
const mapsCategory = 'Maps';
const weatherCategory = 'Weather';

var ResearchSuggestions = React.createClass({
    propTypes: placeProp,
    render(){
        var place = this.props.place;

        var links = [
          {
            site: 'Peakbagger',
            category: betaTrsCategory,
            description: 'Short trip reports in a database of peak info. GPS Tracks often available.',
            url: get_peakbagger_link(place)
          },
          {
            site: 'SummitPost',
            category: betaTrsCategory,
            description: 'Curated mountain and route descriptions written by experts.',
            url: `http://www.summitpost.org/object_list.php?object_type=1&object_name_1=${place.namePlussed}`
          },
          {
            site: 'Washington Trails',
            category: betaTrsCategory,
            description: 'Trip reports and route descriptions generally aimed at hikers rather than mountain climbers.',
            url: `http://www.wta.org/go-hiking/trip-reports/tripreport_search?title=${place.namePlussed}`
          },
          {
            site: 'Weather.gov',
            category: weatherCategory,
            description: 'Detailed weather reports and graphs pinpointed to your peak\'s location.',
            url: `http://forecast.weather.gov/MapClick.php?lon=${place.lon}&lat=${place.lat}`
          },
          {
            site: 'Mountain-Forecast',
            category: weatherCategory,
            description: 'Peak-specific weather reports with forecasts at various altitudes.',
            url: `http://www.mountain-forecast.com/peaks/${place.nameHypenated}`
          },
          {
            site: 'CalTopo',
            category: mapsCategory,
            description: 'Swiss army knife of online mapping software - has slope-angle overlays, simulated point-of-view generation, and the best printing abilities.',
            url: `http://caltopo.com/map.html#ll=${place.lat},${place.lon}&z=14&b=t`
          },
          {
            site: 'Cascade Climbers',
            category: betaTrsCategory,
            description: 'Trip reports and beta site frequented by intermediate to advanced climbers in the cascades. Link goes to search page.',
            url: `http://cascadeclimbers.com/forum/ubbthreads.php/ubb/tripreportsbeta`,
            integrated: false
          },
        ];
        const groups = _.groupBy(
            links,
            'category'
        );
        const groupElements = _.map(
            groups,
            function(groupLinks, groupName){
                return <ResearchLinkGroup title={groupName} key={groupName}>
                    {_.map(
                        groupLinks,
                        function(link){
                            return <ResearchLink
                                siteName={link.site}
                                url={link.url}
                                description={link.description}
                                key={link.site + link.url}
                            />;
                        }
                    )}
                </ResearchLinkGroup>;
            }
        )

        return <div className="research-suggestions">
            {groupElements}
        </div>
    }
})

var FeedbackMessage = React.createClass({
    render(){
        return <p>
        Thanks for playing! 
        Drop me some <a href="https://docs.google.com/document/d/1s91RrNYWmucPVacHv7GkcTUHQmXTvpcIk0xGPHxJZ3A/edit?usp=sharing" target="_new">feedback</a>!
        </p>
    }
})

var ResultPanel = React.createClass({
    propTypes: {
        place: React.PropTypes.object.isRequired
    },
    render () {
        return _.isUndefined(this.props.place)?
        <div></div> : <div>
            <TargetSummary place={this.props.place} />
            <h1 className="research-title">Research</h1>
            <ResearchSuggestions place={this.props.place} />
            <FeedbackMessage/>
        </div>
    }
});

export default ResultPanel;