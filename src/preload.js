
window.addEventListener('DOMContentLoaded', () => {
	const WORKER_URL = 'https://verify-key.denisg28g.workers.dev';

	function showAccessModal(message = '') {
		const modal = document.createElement('div');
		modal.style.position = 'fixed';
		modal.style.top = '0';
		modal.style.left = '0';
		modal.style.width = '100vw';
		modal.style.height = '100vh';
		modal.style.background = 'rgba(0,0,0,0.7)';
		modal.style.display = 'flex';
		modal.style.flexDirection = 'column';
		modal.style.justifyContent = 'center';
		modal.style.alignItems = 'center';
		modal.style.zIndex = '9999';

		const box = document.createElement('div');
		box.style.background = '#222';
		box.style.padding = '32px';
		box.style.borderRadius = '12px';
		box.style.boxShadow = '0 2px 16px #000';
		box.style.textAlign = 'center';
		box.style.color = '#fff';

		const title = document.createElement('h2');
		title.textContent = 'Введите ключ доступа';
		box.appendChild(title);

		if (message) {
			const msg = document.createElement('div');
			msg.textContent = message;
			msg.style.color = '#ff5555';
			msg.style.marginBottom = '12px';
			box.appendChild(msg);
		}

		const input = document.createElement('input');
		input.type = 'text';
		input.placeholder = 'Ключ доступа';
		input.style.margin = '12px 0';
		input.style.padding = '8px';
		input.style.width = '220px';
		box.appendChild(input);

		const btn = document.createElement('button');
		btn.textContent = 'Войти';
		btn.style.padding = '8px 24px';
		btn.style.marginTop = '8px';
		btn.onclick = async () => {
			btn.disabled = true;
			btn.textContent = 'Проверка...';
			const valid = await checkKeyOnServer(input.value);
			btn.disabled = false;
			btn.textContent = 'Войти';
			if (valid) {
				// Показать сообщение об успешной активации
				box.innerHTML = '<h2 style="color:#4caf50;">Ключ принят! Доступ открыт.</h2>';
				setTimeout(() => {
					document.body.removeChild(modal);
				}, 1200);
			} else {
				modal.remove();
				showAccessModal('Неверный ключ!');
			}
		};
		box.appendChild(btn);
	async function checkKeyOnServer(key) {
		try {
			const res = await fetch(WORKER_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ key })
			});
			const data = await res.json();
			return data.valid === true;
		} catch {
			return false;
		}
	}

		modal.appendChild(box);
		document.body.appendChild(modal);
	}

	function checkAccess() {
		showAccessModal();
		return false;
	}

	checkAccess();
});
