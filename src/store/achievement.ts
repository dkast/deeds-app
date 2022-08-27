import create from "zustand"

interface AchievementState {
  unlocked: boolean
  setUnlocked: (unlocked: boolean) => void
}

const useAchievementStore = create<AchievementState>()(set => ({
  unlocked: false,
  setUnlocked: unlocked => set(state => ({ unlocked: unlocked }))
}))

export default useAchievementStore
