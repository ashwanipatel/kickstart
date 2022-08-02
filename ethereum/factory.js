import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x6d30828Da6ea261D81EF87073560d4aDDbe0E6d6'
);


export default instance;