import {connect} from 'react-redux';
import ResultPanel from '../components/ResultPanel';


const mapStateToProps = state => {
    return {
        place: state.place,
    };
};

const ResultPanelContainer = connect(
  mapStateToProps
)(ResultPanel);

export default ResultPanelContainer;
