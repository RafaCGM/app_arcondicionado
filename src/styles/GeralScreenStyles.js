import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const colors = {
  background: "#FFFFFF", // Fundo branco
  card: "#FFFFFF",
  text: "#1F2937",
  subtext: "#888888",
  primary: "#4CAF50", // Verde personalizado
  alertBg: "#FEE2E2",
  alertText: "#B91C1C",
  wave: "#E8F5E9", // Versão clara da cor verde para efeito onda
}

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
    alignSelf: "center",
  },
  card: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  wave: {
    position: "absolute",
    width: 400,
    height: 200,
    top: -80,
    left: 0,
    backgroundColor: colors.wave,
    opacity: 0.3,
    borderRadius: 200,
    transform: [{ rotate: "20deg" }],
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  salaNome: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 30
  },
  statusIcon1: {
    flexDirection: "row",
    alignItems: "center"
  },
  statusIcon2: {
    flexDirection: "row",
    alignItems: "center",
  },
  temp: {
    fontSize: 26,
    color: colors.primary,
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  controlButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    transform: [{ scale: 1 }],
  },
  powerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  powerText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  alertBox: {
    backgroundColor: colors.alertBg,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  alertText: {
    color: colors.alertText,
    fontSize: 14,
    marginBottom: 3,
  },
})
