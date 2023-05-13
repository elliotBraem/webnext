import { SelectorInit } from "./types";

export const initKeypomWallet: SelectorInit = async (config) => {
	const { store, logger, emitter, options, keypomWallet } = config;
	console.log("I AM INITTING KEYPOM?????");

	// return the wallet interface for wallet-selector
	return {
		get networkId() {
			return keypomWallet.networkId;
		},

		// async getAccount() {
		// 	return keypomWallet.getAccount();
		// },

		async getAccounts() {
			logger.log("Keypom:account");
			return keypomWallet.getAccounts();
		},

		async switchAccount(id) {
			return await keypomWallet.switchAccount(id);
		},

		getAccountId() {
			logger.log("Keypom:getAccountId");
			return keypomWallet.getAccountId();
		},

		async isSignedIn() {
			logger.log("Keypom:isSignedIn");
			return await keypomWallet.isSignedIn();
		},

		async getAvailableBalance() {
			logger.log("Keypom:isSignedIn");
			return await keypomWallet.getAvailableBalance();
		},

		async verifyOwner() {
			throw Error(
			  "KeypomWallet:verifyOwner is deprecated"
			);
		  },
		
		async signIn() {
			logger.log("Keypom:signIn");
			return await keypomWallet.signIn();
		},

		async signOut() {
			logger.log("Keypom:signOut");
			return await keypomWallet.signOut();
		},

		async signAndSendTransaction(params) {
			return await keypomWallet.signAndSendTransaction(params);
		},

		async signAndSendTransactions({ transactions }) {
			logger.log("Keypom:signAndSendTransactions", { transactions });
			return await keypomWallet.signAndSendTransactions(transactions);
		},
	};
};	
