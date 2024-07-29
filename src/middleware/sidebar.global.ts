const { showSidebar } = useSidebar();

export default defineNuxtRouteMiddleware(() => {
	showSidebar.value = true;
});
