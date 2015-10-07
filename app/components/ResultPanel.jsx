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
        url: React.PropTypes.string.isRequired,
    },
    render(){
        const onClick = () => trackOutboundLink(this.props.url);
        return <li>
            <a 
                href={this.props.url}
                onClick={onClick}
                target="_blank"
                className="site"
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
            url: get_peakbagger_link(place)
          },
          {
            site: 'SummitPost',
            category: betaTrsCategory,
            url: `http://www.summitpost.org/object_list.php?object_type=1&object_name_1=${place.namePlussed}`
          },
          {
            site: 'WTA',
            category: betaTrsCategory,
            url: `http://www.wta.org/go-hiking/trip-reports/tripreport_search?title=${place.namePlussed}`
          },
          {
            site: 'Weather.gov',
            category: weatherCategory,
            url: `http://forecast.weather.gov/MapClick.php?lon=${place.lon}&lat=${place.lat}`
          },
          {
            site: 'Mountain-Forecast',
            category: weatherCategory,
            url: `http://www.mountain-forecast.com/peaks/${place.nameHypenated}`
          },
          {
            site: 'CalTopo',
            category: mapsCategory,
            url: `http://caltopo.com/map.html#ll=${place.lat},${place.lon}&z=14&b=t`
          },
          {
            site: 'Cascade Climbers',
            category: betaTrsCategory,
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
                            return <ResearchLink siteName={link.site} url={link.url} key={link.site + link.url}/>;
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