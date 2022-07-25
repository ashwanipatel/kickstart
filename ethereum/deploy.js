const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFacotry = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'message occur loop staff slice crouch country asthma minute problem excess pyramid',
  'https://rinkeby.infura.io/v3/6f00e94fd3cc402a8f63f7cf1368d69e'

);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFacotry.interface))
    .deploy({ data: compiledFacotry.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
