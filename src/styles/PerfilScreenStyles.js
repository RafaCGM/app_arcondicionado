import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const colors = {
  background: "#FFFFFF",
  card: "#FFFFFF",
  text: "#1F2937",
  subtext: "#888888",
  primary: "#4CAF50",
  alertBg: "#FEE2E2",
  alertText: "#B91C1C",
  wave: "#E8F5E9",
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.text,
    marginVertical: 20,
    alignSelf: "center",
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  box: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    width: "48%",
    marginBottom: 16,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  boxLabel: {
    fontSize: 14,
    color: colors.subtext,
    marginTop: 8,
  },
  boxValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 4,
  },
  waveContainer: {
    position: "absolute",
    top: -50,
    left: -80,
    width: 400,
    height: 200,
    backgroundColor: colors.wave,
    borderRadius: 200,
    opacity: 0.4,
    transform: [{ rotate: "20deg" }],
  },
  waveContainerBottom: {
    position: "absolute",
    bottom: -50,
    right: -80,
    width: 400,
    height: 200,
    backgroundColor: colors.wave,
    borderRadius: 200,
    opacity: 0.4,
    transform: [{ rotate: "-20deg" }],
  },
  controlButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  powerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  
});
