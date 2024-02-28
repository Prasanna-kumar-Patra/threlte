import { getCollection, type CollectionEntry } from 'astro:content'

type ReferenceCategoryKey = NonNullable<CollectionEntry<'reference'>['data']['category']>

const referenceSidebarMenuCategoryOrder: ReferenceCategoryKey[] = [
  '@threlte/core',
  '@threlte/extras',
  '@threlte/gltf',
  '@threlte/rapier',
  '@threlte/theatre',
  '@threlte/xr',
  '@threlte/flex',
  'Documentation'
]

const getReferenceSidebarMenu = async (): Promise<LeftSidebarMenu> => {
  const referenceCollection = await getCollection('reference')

  const categoryNames = [...new Set(referenceCollection.map((item) => item.data.category))]

  const categories = categoryNames.map((category): LeftSidebarMenuCategory => {
    const menuItems = referenceCollection
      .filter((item) => item.data.showInSidebar && item.data.category === category)
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
      .map((item): LeftSidebarMenuItem => {
        return {
          title: item.data.name,
          slug: item.slug,
          isDivider: item.data.isDivider ?? false
        }
      })
    return {
      urlPrefix: '/docs/reference',
      menuItems,
      title: category
    }
  })

  categories.sort((a, b) => {
    return (
      referenceSidebarMenuCategoryOrder.indexOf(a.title as ReferenceCategoryKey) -
      referenceSidebarMenuCategoryOrder.indexOf(b.title as ReferenceCategoryKey)
    )
  })

  return {
    categories
  }
}

type LearnCategoryKey = CollectionEntry<'learn'>['data']['category']

const learnSidebarMenuCategoryOrder: LearnCategoryKey[] = [
  'Guide',
  'Resources'
]

const getLearnSidebarMenu = async (): Promise<LeftSidebarMenu> => {
  const learnCollection = await getCollection('learn')

  const categoryNames = [...new Set(learnCollection.map((item) => item.data.category))]

  const categories = categoryNames.map((category): LeftSidebarMenuCategory => {
    const menuItems = learnCollection
      .filter((item) => item.data.showInSidebar && item.data.category === category)
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
      .map((item): LeftSidebarMenuItem => {
        return {
          title: item.data.title,
          slug: item.slug,
          isDivider: item.data.isDivider ?? false
        }
      })
    return {
      urlPrefix: `/docs`,
      menuItems,
      title: category
    }
  })

  categories.sort((a, b) => {
    return (
      learnSidebarMenuCategoryOrder.indexOf(a.title as LearnCategoryKey) -
      learnSidebarMenuCategoryOrder.indexOf(b.title as LearnCategoryKey)
    )
  })

  return {
    categories
  }
}


export const getLeftSidebarMenu = async (): Promise<
  Record<'learn' | 'reference', LeftSidebarMenu>
> => {
  const reference = await getReferenceSidebarMenu()
  const learn = await getLearnSidebarMenu()

  return {
    reference,
    learn
  }
}
